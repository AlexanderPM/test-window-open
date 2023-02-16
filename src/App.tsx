import React from 'react';
import './App.css';

function App() {
  const handleClickAsync = () => {
      asyncFn().then((url) => {
          window.open(url,"_blank");
      });
  }
  const handleClick = () => {
      window.open("https://www.drom.ru/","_blank");
  }

  const handleClickAsyncFixOne = () => {
      const newWindow = window.open();
     asyncFn().then((url) => {
         if (newWindow)
        newWindow.location = url;
     }).catch(() => {
         if (newWindow) {
             newWindow.close();
         }
     });
   }

  const handleClickAsyncFixTwo = () => {
      asyncFn().then((url) => {
         const a = document.createElement('a');
         a.href = url;
         a.setAttribute('target', '_blank');
         a.click();
         a.remove();
      });
  }

    const handleClickAsyncFixThree = () => {
        asyncFn().then((url) => {
            setTimeout(() => {
                window.open(url,"_blank");
            })
        });
    }

    const handleClickAsyncFixFour = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        asyncFn().then((url) => {
            setTimeout(() => {
                window.open(url,"_blank");
            })
        });
    }


    const handleClickAsyncFixFive = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        let link: string | undefined = undefined;
        asyncFn().then((url) => {
            link = url;
        });
        const intervalId = setInterval(() => {
            if (link !== undefined) {
                clearInterval(intervalId);
                window.open(link,"_blank");
            }
        },  500)
    }

  const asyncFn = async (): Promise<string> => {
      return await new Promise((resolve) => {
          setTimeout(() => {
              return resolve('https://www.drom.ru/');
          }, 5000)
      })
  }

  return (
    <div className="App">
        <div className="container">
            <button onClick={handleClickAsync}>Перейти на другой сайт async</button>
            <button onClick={handleClick}>Перейти на другой сайт моментально</button>
            <button onClick={handleClickAsyncFixOne}>Перейти на другой сайт fix 1</button>
            <button onClick={handleClickAsyncFixTwo}>Перейти на другой сайт fix 2</button>
            <button onClick={handleClickAsyncFixThree}>Перейти на другой сайт fix 3</button>
            <button onClick={handleClickAsyncFixFour}>Перейти на другой сайт fix 4</button>
            <button onClick={handleClickAsyncFixFive}>Перейти на другой сайт fix 5</button>
        </div>

    </div>
  );
}

export default App;
