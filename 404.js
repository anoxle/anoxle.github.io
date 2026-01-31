document.addEventListener('DOMContentLoaded', function () {
    const stage = document.createElement('div');
    stage.className = 'lost-wrap';

    const text = document.createElement('h1');
    text.className = 'lost-text';
    text.textContent = 'Looks like you are lost.';

    const back = document.createElement('button');
    back.className = 'btn-home';
    back.textContent = 'Back to Home';

    stage.appendChild(text);
    stage.appendChild(back);
    document.body.appendChild(stage);

    const sheet = `
        @import url('https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&display=swap');

        body {
            margin: 0;
            padding: 0;
            background-color: #1f232e;
            background-image: radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 0);
            background-size: 25px 25px;
            font-family: 'Segoe UI', system-ui, sans-serif;
            color: white;
            overflow: hidden;
        }

        .lost-wrap {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 20px;
        }

        .lost-text {
            font-family: 'Mochiy Pop One', sans-serif;
            font-size: clamp(1.8rem, 6vw, 3.5rem);
            margin: 0 0 40px 0;
            background: linear-gradient(90deg, #725de6, #9b62da);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .btn-home {
            background: white;
            color: #1f232e;
            border: none;
            padding: 15px 45px;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-home:hover {
            background: #725de6;
            color: white;
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(114, 93, 230, 0.4);
        }
    `;

    const style = document.createElement('style');
    style.textContent = sheet;
    document.head.appendChild(style);

    back.onclick = () => {
        window.location.href = 'https://anoxle.github.io/';
    };
});