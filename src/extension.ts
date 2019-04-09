'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerTextEditorCommand('emacs-indent.reindentCurrentLine', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No editor');
            return;
        }
        if (editor.document.languageId === 'plaintext') {
            vscode.commands.executeCommand('editor.action.indentLines');
        } else {
            reindentCurrentLine(editor);
        }
    });
    context.subscriptions.push(disposable);
}
export function deactivate() { }

function getCurrentLine(editor: vscode.TextEditor): string {
    const position = editor.selection.active;
    const range = new vscode.Range(position.with(position.line, 0), position.with(position.line + 1, 0));
    return editor.document.getText(range);
}

function reindentCurrentLine(editor: vscode.TextEditor) {
    let position = editor.selection.active;
    let currentLine = getCurrentLine(editor);
    vscode.commands.executeCommand('editor.action.reindentselectedlines').then(val => {
        let offset = currentLine.length - position.character; // position from right
        if (offset < currentLine.trimLeft().length) {
            currentLine = getCurrentLine(editor);
            const newPosition = position.with(position.line, currentLine.length - offset);
            const newSelection = new vscode.Selection(newPosition, newPosition);
            editor.selection = newSelection;
        } else {
            currentLine = getCurrentLine(editor);
            offset = currentLine.length - currentLine.trim().length; // indent size
            if (offset > position.character) {
                const newPosition = position.with(position.line, offset - 1);
                const newSelection = new vscode.Selection(newPosition, newPosition);
                editor.selection = newSelection;
            }
        }
    });
}
