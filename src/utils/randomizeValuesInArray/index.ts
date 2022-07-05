function randomizeValuesInArray(arr:Array<any>) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export default randomizeValuesInArray;