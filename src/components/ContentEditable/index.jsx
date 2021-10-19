import { useRef, useEffect } from 'react';

function ContentEditable({ text, onChange, label, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    // prevent the cursor from jumping to the front when `text` changes externally
    if (document.activeElement === ref.current) {
      // helpful src: https://stackoverflow.com/a/3866442
      const range = document.createRange(); // Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(ref.current); // Select the entire contents of the element with the range
      range.collapse(false); // collapse the range to the end point. false means collapse to end rather than the start
      const selection = window.getSelection(); // get the selection object (allows you to change selection)
      selection.removeAllRanges(); // remove any selections already made
      selection.addRange(range); // make the range you have just created the visible selection
    }
  }, [text]);

  return (
    <div
      ref={ref}
      role="textbox"
      contentEditable="true"
      suppressContentEditableWarning={true}
      onInput={onChange}
      {...props}
    >
      {text}
    </div>
  );
}

export default ContentEditable;
