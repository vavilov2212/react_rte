import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { createEditor, Node } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
// import style from './SlateRteUIStyle.scss';

const SlateRteUI = props => {

  const editor = useMemo(() => withReact(createEditor()), [])

    // Add the initial value when setting up our state.
  const [value, setValue] = useState<Node[]>([
      {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ])

  const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>
    }

    if (leaf.code) {
      children = <code>{children}</code>
    }

    if (leaf.italic) {
      children = <em>{children}</em>
    }

    if (leaf.underline) {
      children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
  }

  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  const Toolbar = props => <div {...props} />;

  return (
    <div style={{
      background: 'rgb(255, 255, 255)',
      color: 'black',
      maxWidth: '42em',
      margin: '20px auto',
      padding: '20px',
    }}>
      <Slate
        editor={editor}
        value={value}
        onChange={newValue => setValue(newValue)}
      >
        <Toolbar>
          <button>1</button>
          <button>2</button>
        </Toolbar>
        <Editable
          renderLeaf={renderLeaf}
        />
      </Slate>
    </div>
  );
}

export default SlateRteUI;
