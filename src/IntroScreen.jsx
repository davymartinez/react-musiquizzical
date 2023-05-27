/* eslint-disable react/prop-types */
const IntroScreen = (props) => {
    return (
        <div className='container'>
            <div className='blob-lemony-intro-container'>
                <img src="/src/assets/blob-lemony.png" alt="" />
            </div>
            <header className='intro-header'>Musiquizzical</header>
            <p className='intro-p'>Ready for a music quiz? Press/tap the button below:</p>
            <button className='intro-button' onClick={props.startQuiz}>
                Start quiz
            </button>
            <div className='blob-baby-intro-container'>
                <img src="/src/assets/blob-baby.png" alt="" />
            </div>
            <footer className='intro-footer'>
                <p>Created by <a href='https://github.com/davymartinez'>Davy Martinez</a></p>
            </footer>
        </div>
    )
}

export default IntroScreen