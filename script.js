
class Observer {
  observers = [];
  subscribe(fn) {
    this.observers.push(fn);
  }
  unsubscribe(fn) {
    this.observers = this.observers.filter(subscriber => subscriber !== fn);
  }
  next(data) {
    this.observers.forEach(subscriber => subscriber(data));
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const observer = new Observer();

  document.getElementById('calculateButton').addEventListener('click', () => {
    const a = document.getElementById('numberA').value;
    const b = document.getElementById('numberB').value;
    const c = document.getElementById('numberC').value;
    const result = quadraticEquation(a, b, c);
    const discriminant = result[0];

    document.getElementById('discriminant').innerHTML = `Discriminant: ${discriminant} <br>`
    if (discriminant < 0) {
      document.getElementById('roots').innerHTML = 'No Roots';
    }
    if (discriminant === 0) {
      document.getElementById('roots').innerHTML = `One root: ${result[1]}`

    }
    if (discriminant > 0) {
      document.getElementById('roots').innerHTML = `Root 1: ${result[1]} <br>Root 2: ${result[2]}`;
    }
  });

  const viewData = {
    a: null,
    b: null,
    c: null
  }
  document.getElementById('numberA').addEventListener('keyup', (e) => {
    viewData.a = Number(e.target.value) || null;
    observer.next(viewData);
  });

  document.getElementById('numberB').addEventListener('keyup', (e) => {
    viewData.b = e.target.value || null;
    observer.next(viewData);
  });

  document.getElementById('numberC').addEventListener('keyup', (e) => {
    viewData.c = e.target.value || null;
    observer.next(viewData);
  });
  observer.subscribe((e) => {
    document.getElementById('numberAResult').innerHTML = e.a !== null ? e.a + '<i>x</i><sup>2</sup>' : '';
    document.getElementById('numberBResult').innerHTML = e.b !== null ? e.b > 0 ? '+' + e.b + '<i>x</i>' : e.b + '<i>x</i>' : '';
    document.getElementById('numberCResult').innerHTML = e.c > 0 ? '+' + e.c : e.c;
    if (e.a !== null || e.b !== null || e.c !== null) {
      document.getElementById('equationEnd').innerHTML = '=0'
    }
    console.log('Subscription: ', e);
  });

  const discriminant = (a, b, c) => b * b - 4 * a * c;
  const getRoot1 = (a, b, d) => (-b + Math.sqrt(d)) / (2 * a);
  const getRoot2 = (a, b, d) => (-b - Math.sqrt(d)) / (2 * a);
  function quadraticEquation(a, b, c) {
    const d = discriminant(a, b, c);
    if (d < 0) {
      return [d];
    }
    const x1 = getRoot1(a, b, d);
    const x2 = getRoot2(a, b, d);
    return [d, x1, x2];
  }

});