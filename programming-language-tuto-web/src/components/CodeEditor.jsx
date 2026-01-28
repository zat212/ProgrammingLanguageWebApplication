import React from 'react';
import Editor from '@monaco-editor/react';

function CodeEditor({ onCodeChange, initialCode, isReadOnly = false }) {
    return (
        <div style={{ height: '200px', width: '100%', border: '1px solid #ddd' }}>
            <Editor
                language="java"
                defaultValue={initialCode}
                value={initialCode}
                theme='vs-dark'
                onChange={isReadOnly ? () => { } : onCodeChange}
                options={{
                    readOnly: isReadOnly,
                    domReadOnly: isReadOnly
                }}
            />
        </div>
    );
}

export default CodeEditor;