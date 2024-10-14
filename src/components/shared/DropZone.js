import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import doc from "assets/images/doc.png";

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  transition: "border .3s ease-in-out",
  outline: "none",
};

const activeStyle = {
  borderColor: "#2196f3",
  cursor: "poiner !important",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const styleThumb = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginRight: "5px",

  span: {
    fontSize: "0.8em",
  },
};

const styleThumbsWrapper = {
  display: "flex",
};

function MyDropzone(props) {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFile) => {
    props.onDrop(acceptedFile);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  function openDoc(file) {
    window.open(file.preview);
  }

  const imgSize = "80px";
  const thumbs = props.files.map((file) => (
    <div style={styleThumb} onClick={openDoc.bind(this, file)} key={file.name}>
      <img
        src={doc}
        style={{ width: imgSize, height: imgSize }}
        alt={file.name}
      />
      <span style={styleThumb.span}>{file.name}</span>
    </div>
  ));

  function cleanUp() {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }

  useEffect(() => {
    return cleanUp;
  }, []);

  return (
    <section style={{ cursor: "pointer" }}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div>Drag and drop your file here.</div>
      </div>
      <aside style={styleThumbsWrapper}>{thumbs}</aside>
    </section>
  );
}

export default MyDropzone;
