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

    if (position.line > 0 && editor.document.lineAt(position.line - 1).isEmptyOrWhitespace) {
        let s = position.line - 1
        while (editor.document.lineAt(s).isEmptyOrWhitespace) {
            --s;
        }
        editor.selection = new vscode.Selection(position.with(s, 0), position.with(position.line + 1, 0));
    }
    vscode.commands.executeCommand('editor.action.reindentselectedlines').then(val => {
        editor.selection = new vscode.Selection(position, position);
        let offset = currentLine.length - position.character; // position from right
        if (offset < currentLine.trimLeft().length) {
            currentLine = getCurrentLine(editor);
            position = position.with(position.line, currentLine.length - offset);
        } else {
            currentLine = getCurrentLine(editor);
            offset = currentLine.length - currentLine.trim().length; // indent size
            position = position.with(position.line, offset - 1);
        }
        editor.selection = new vscode.Selection(position, position);
    });
}
