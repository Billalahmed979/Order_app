document.getElementById('roadList')?.append(...['নয়াবাজার', 'ফুলতলা', 'কামিনীগঞ্জ', 'মানিকসিং', 'ওয়াবদা', 'ভবানীগঞ্জ', 'বাছিরপুর'].map(name => {
  const li = document.createElement('li');
  li.textContent = name;
  return li;
}));