const handleFileUpload = (event:any, setFieldValue:any) => {
    setFieldValue("file", event.currentTarget.files[0]);
}

export default handleFileUpload;