window.onload = () => {
    const bd = new Date("2000/07/22 16:00") // circa

    const mail = document.querySelector('#mail-fill a')
    mail.innerText = 'edoardo.viviani' + '@' + 'gmail.com'
    mail.href = 'mailt' + 'o:edoardo.viviani' + '@' + 'gmail.com'

    const secondsAge = document.querySelector('#sec-age')
    const age = document.querySelector('#age')

    updateThings()
    function updateThings() {
        const now = new Date()
        secondsAge.innerText = numToWords(Math.floor((now - bd) / 60000))

        const ceil = now.getMonth() < 6 || (now.getMonth() == 6 && now.getDate() <= 22);

        age.innerText = ceil ? age.getAttribute('aria-ceil') : age.getAttribute('aria-floor')
        age.innerText += ' '
        age.innerText += new Date(now - bd).getFullYear() - 1970 + (ceil ? 1 : 0)

        setTimeout(updateThings, 50)
    }

  listenToTogglers();
}


function listenToTogglers() {
  document.querySelectorAll('.toggler').forEach(toggler => {
    toggler.addEventListener('click', () => {
      const target = document.getElementById(toggler.getAttribute('aria-target'))
      target.classList.toggle('closed')

      const altext = toggler.getAttribute('aria-altext')
      toggler.setAttribute('aria-altext', toggler.innerText)
      toggler.innerText = altext
    })
  })
}

// Things i happily got from StackOverflow

// https://stackoverflow.com/users/633183/thank-you
function numToWords(n) {
    const arr = x => Array.from(x);
    const num = x => Number(x) || 0;
    const str = x => String(x);
    const isEmpty = xs => xs.length === 0;
    const take = n => xs => xs.slice(0,n);
    const drop = n => xs => xs.slice(n);
    const reverse = xs => xs.slice(0).reverse();
    const comp = f => g => x => f (g (x));
    const not = x => !x;
    const chunk = n => xs => isEmpty(xs) ? [] : [take(n)(xs), ...chunk (n) (drop (n) (xs))];

    let a = [
      '', 'one', 'two', 'three', 'four',
      'five', 'six', 'seven', 'eight', 'nine',
      'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
      'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];
    let b = [
      '', '', 'twenty', 'thirty', 'forty',
      'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
    ];
    let g = [
      '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
      'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'
    ];
    // this part is really nasty still
    // it might edit this again later to show how Monoids could fix this up
    let makeGroup = ([ones,tens,huns]) => {
      return [
        num(huns) === 0 ? '' : a[huns] + ' hundred ',
        num(ones) === 0 ? b[tens] : b[tens] && b[tens] + '-' || '',
        a[tens+ones] || a[ones]
      ].join('');
    };
    // "thousands" constructor; no real good names for this, i guess
    let thousand = (group,i) => group === '' ? group : `${group} ${g[i]}`;
    // execute !
    if (typeof n === 'number') return numToWords(String(n));
    if (n === '0')             return 'zero';
    return comp (chunk(3)) (reverse) (arr(n))
      .map(makeGroup)
      .map(thousand)
      .filter(comp(not)(isEmpty))
      .reverse()
      .join(' ');
  };