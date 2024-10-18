'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const name = data.name.common;
  const flag = data.flags.svg;
  const region = data.region;
  const language = Object.values(data.languages)[0];
  const currency = Object.values(data.currencies)[0].name;

  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${flag}" />
    <div class="country__data">
      <h3 class="country__name">${name}</h3>
      <h4 class="country__region">${region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${language}</p>
      <p class="country__row"><span>💰</span>${currency}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function (country) {
//   //ajax call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     //RENDER COUNTRY 1
//     renderCountry(data);

//     //Get neighbour conuntry
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     //AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('germany');

const getJSON = function (url, errMsg = 'Something went wrong!') {
  return fetch(`${url}`).then(response => {
    if (!response.ok) throw new Error(`${errMsg} ${response.status}`);

    return response.json();
  });
};

// const getCountryData = function (country) {
//   //Country 1
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders[0];
//       if (!neighbour) throw new Error('No neighbour found!');

//       //Country 2
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('australia');
// });

//CHALLANGE #1

// const getCountryData = function (country) {
//   //Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found! ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbour = data[0]?.borders[0];

//       if (!neighbour) return;

//       //Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// btn.addEventListener('click', function () {
//   getCountryData('poland');
// });

// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=JSON&auth=)`
//   )
//     .then(response => {
//       if (response.ok === false)
//         throw new Error(`Problem with geocoding ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.region}, ${data.country}`);

//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found! ${response.status}`);
//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => {
//       console.error(`${err.message}`);
//     });
// };
// whereAmI(55.508, 13.381);

// //SECTION THE EVENT LOOP IIN PRACTICE
// console.log('Test Start');
// setTimeout(() => {
//   console.log('0 sec timer');
// }, 0);
// Promise.resolve('Resolved promise 1').then(res => {
//   for (let i = 0; i < 100000; i++) {}
//   console.log(res);
// });

// console.log('Test end');

// //SECTION BUILDING A SIMPLE PROMISE

// const lotteryPromise = new Promise(function (resolve, reject) {
//   if (Math.random() >= 0.5) {
//     resolve('You won!');
//   } else reject('You lost! 💩');
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(6).then(() => {
//   console.log(`I waited for 2 seconds`);
//   return wait(1);
// });

//SECTION PROMISYFING GEOLOCATION API

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then(pos => console.log(pos));

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(
//         `https://geocode.xyz/${lat},${lng}?geoit=JSON&auth=)`
//       );
//     })
//     .then(response => {
//       if (response.ok === false)
//         throw new Error(`Problem with geocoding ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.region}, ${data.country}`);

//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found! ${response.status}`);
//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => {
//       console.error(`${err.message}`);
//     });
// };
// btn.addEventListener('click', whereAmI);

//CHALLANGE 2#
// let currentImage;

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = `${imgPath}`;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Img not found 💩'));
//     });
//   });
// };

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// createImage('img/img-1.jpg')
//   .then(res => {
//     currentImage = res;
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(res => {F
//     currentImage = res;
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//   })
//   .catch(err => console.error(err));

//SECTION CONSUMING PROMISES WITH ASYNC AWAIT

//NOTE AWAIT WILL STOP THE EXECUTION UNTIL THE DATA IS COMPLETED
//IMPORTANT VERY USEFULL
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function (country) {
//   try {
//     const pos = await getPosition();

//     const { latitude: lat, longitude: lng } = pos.coords;

//     //Reverse geocoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!resGeo.ok) throw new Error(`Problem getting location data`);
//     const dataGeo = await resGeo.json();
//     console.log(dataGeo);

//     //THE SAME
//     //fetch(`https://restcountries.com/v3.1/name/${country}`).then(res=>console.log(res))

//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.country}`
//     );
//     if (!res.ok) throw new Error(`Problem getting Country`);
//     const data = await res.json();
//     console.log(data);
//     renderCountry(data[0]);

//     return `You are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     renderError(`${err.message}`);

//     //REJECT PROMISE RETURNED FORM ASYNC FUNCTION

//     throw err;
//   }
// };

// whereAmI()
//   .then(() => console.log(`2: ${city}`))
//   .catch(err => console.error(err))
//   .finally(() => console.log(`3: Finished getting Location`));
// console.log('first');

//SECTION TRY CATCH

// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2: ${err.message}`);
//   }
//   console.log(`3: Finished getting location`);
// })();

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
//     //NOTE RUNS ALL THE PRIMISES AT THE SAME TIME
//     //NOTE IF ONE PROMISE REJECTS, EVERYTHING ELSE also REJECTS
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);
//     console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('portugal', 'Canada', 'Poland');

// //SECTION Other Promise Combinators: race, allSettled and any

// //Promise.race
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/Italy`),
//     getJSON(`https://restcountries.com/v3.1/name/Egypt`),
//     getJSON(`https://restcountries.com/v3.1/name/Mexico`),
//   ]);
//   console.log(res);
// })();

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long!`));
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.com/v3.1/name/Poland`),
//   timeout(5),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

// //Promise.allSettled
// //NOTE RETURN AN ARRAY OF ALL PROMISES SIMILAR TO PROMISE.ALL

// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.resolve('Success'),
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
// ]).then(res => console.log(res));

// //PROMISE.ANY [ES2021]

// //RETURNS FIRST OBJECT THAT IS FULLIFIED
// Promise.any([
//   Promise.resolve('Success'),
//   Promise.resolve('Success'),
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
// ]).then(res => console.log(res));

let currentImage;

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = `${imgPath}`;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Img not found 💩'));
    });
  });
};

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const loadNPause = async function () {
  try {
    let imgWait = await createImage(`img/img-1.jpg`);
    await wait(2);
    imgWait.style.display = 'none';
    imgWait = await createImage(`img/img-2.jpg`);
    await wait(2);
    imgWait.style.display = 'none';
    imgWait = await createImage(`img/img-3.jpg`);
    await wait(2);
    imgWait.style.display = 'none';
  } catch (err) {
    console.error(`There was a problem with loading an image ${err.message}`);
  }
};

// loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgMap = imgArr.map(async img => await createImage(img));

    const imgEl = await Promise.all(imgMap);

    imgEl.forEach(img => {
      img.classList.add('parallel');
    });
  } catch (err) {
    console.error(`There was a problem with an image ${err.message}`);
  }
};

loadAll([`img/img-1.jpg`, `img/img-2.jpg`, `img/img-3.jpg`]);
