// import axios from "axios";
import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DropZone } from "./drop-zone";
import styles from "./file-picker.module.css";
import { FilesList } from "./files-list";

const FilePicker = ({ accept, onFileChange = () => { } }) => {
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0);

    // handler called when files are selected via the Dropzone component
    const handleOnChange = useCallback((files) => {
        onFileChange(files);
        let filesArray = Array.from(files);

        filesArray = filesArray.map((file) => ({
            id: nanoid(),
            file
        }));

        setFiles(filesArray);
    }, []);

    // handle for removing files form the files list view
    const handleClearFile = useCallback((id) => {
        setFiles((prev) => prev.filter((file) => file.id !== id));
    }, []);

    return (
        <div className={styles.wrapper}>
            {/* canvas */}
            <div className={styles.canvas_wrapper}>
                <DropZone onChange={handleOnChange} accept={accept} />
            </div>

            {/* files listing */}
            {files.length ? (
                <div className={styles.files_list_wrapper}>
                    <FilesList
                        files={files}
                        onClear={handleClearFile}
                        uploadComplete={() => { }}
                    />
                </div>
            ) : null}
        </div>
    );
};

export default FilePicker;
