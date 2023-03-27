const PageTest = () => {
    
    const dispatch = (message: string) => {
        console.log(message);
    }

    const handleClick = () => {
        dispatch('Clicked')
    }
    return (
        <div>
            <h1>
                Hello World
            </h1>
            <button onClick={handleClick}>Click here</button>
        </div>
    );

}

export default PageTest;