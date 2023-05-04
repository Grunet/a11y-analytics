function getSharedStyleTag() {
  return `
  <style>
    body {
        background-color: rebeccapurple;
        color: #f0e8e8;
        font-family: Verdana;
    }

    :focus {
      border-style: dashed;
      border-width: 0.25rem;
    }
    
    button {
      height: 4rem;
    }

    button:focus {
      border-color: black;
    }

    a {
      color: yellow
    }

    a:visited {
      color: white
    }

</style>`;
}

export { getSharedStyleTag };
