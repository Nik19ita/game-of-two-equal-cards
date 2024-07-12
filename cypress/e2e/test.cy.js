/// <reference types="cypress" />
describe('Игра two cards', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  function open() {
    cy.get('.input-1').type('4');
    cy.get('.input-2').type('4');
    cy.contains('Начать игру').click();
  }

  function getNumber(i) {
    const number = cy
      .get('.div')
      .eq(i)
      .click()
      .should('have.attr', 'data-disabled', 'true')
      .get('.span')
      .eq(i)
      .invoke('text');
    return number;
  }

  it('В начальном состоянии игра должна иметь поле четыре на четыре клетки, в каждой клетке цифра должна быть невидима', () => {
    open();
    cy.get('.div')
      .should('have.attr', 'data-disabled', 'false')
      .should('have.length', 16);
  });

  it('Нажать на одну произвольную карточку. Убедиться, что она осталась открытой.', () => {
    open();
    cy.get('.div').eq(0).click().should('have.attr', 'data-disabled', 'true');
  });

  it('Нажать на левую верхнюю карточку, затем на следующую. Если это не пара, то повторять со следующей карточкой, пока не будет найдена пара. Проверить, что найденная пара карточек осталась видимой.', () => {
    open();

    let i = 0;
    function compareNumber() {
      getNumber(0).then((num1) => {
        getNumber(i).then((num2) => {
          if (num1 !== num2) {
            cy.wait(800);
            i++;
            compareNumber(i);
          } else {
            cy.get('.div').eq(0).should('have.attr', 'data-disabled', 'true');
            cy.get('.div').eq(i).should('have.attr', 'data-disabled', 'true');
          }
        });
      });
    }

    compareNumber();
  });

  it('Нажать на левую верхнюю карточку, затем на следующую. Если это пара, то повторять со следующими двумя карточками, пока не найдутся непарные карточки. Проверить, что после нажатия на третью карточку две несовпадающие карточки становятся закрытыми.', () => {
    open();

    let j = 0
    function compareNumber() {
      getNumber(j).then((num1) => {
        j++
        getNumber(j).then((num2) => {
          if (num1 === num2) {
            cy.wait(800);
            j++
            compareNumber();
          } else {
            cy.get('.div').eq(j--).should('have.attr', 'data-disabled', 'false');
            cy.get('.div').eq(j).should('have.attr', 'data-disabled', 'false');
          }
        });
      });
    }

    compareNumber();
  });
});
