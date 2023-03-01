//как создавать запрос
return fetch('https://nomoreparties.co/v1/plus-cohort-21/', {
  headers: {
    authorization: 'df2d8024-40e8-4519-add0-3eea43f4cfb0'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
