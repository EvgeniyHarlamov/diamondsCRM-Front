function formatClientName(name:string) {
    return (name[0] + '. ' + name.split(' ')[1])
}

export default formatClientName;