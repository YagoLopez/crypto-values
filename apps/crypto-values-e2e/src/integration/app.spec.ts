const DIAGONAL_CELL = '-'
const SELECTOR1 =
  '[tabindex="0"] > .ReactVirtualized__Grid__innerScrollContainer > [style="height: 50px; left: 0px; position: absolute; top: 0px; width: 75px; text-shadow: grey 2px 2px 4px;"]'
const SELECTOR2 =
  '[style="height: 50px; left: 75px; position: absolute; top: 50px; width: 75px; text-shadow: grey 2px 2px 4px;"]'
const SELECTOR_1_3 =
  '[style="height: 50px; left: 150px; position: absolute; top: 0px; width: 75px; color: rgb(56, 180, 56); background-color: rgb(144, 238, 144); text-shadow: grey 2px 2px 4px;"] > div'
const SELECTOR_3_1 =
  '[style="height: 50px; left: 0px; position: absolute; top: 100px; width: 75px; color: rgb(56, 180, 56); background-color: rgba(144, 238, 144, 0.14); text-shadow: grey 2px 2px 4px;"] > div'

describe('Test root route', () => {
  beforeEach(() => cy.visit('/'))

  it('should display cell (1, 1) correctly', () => {
    cy.get(SELECTOR1).should('be.visible').and('have.text', DIAGONAL_CELL)
  })

  it('should display cell (2, 2) correctly', () => {
    cy.get(SELECTOR2).should('be.visible').and('have.text', DIAGONAL_CELL)
  })
})

describe('Test "/period/1h" route', () => {
  beforeEach(() => cy.visit('/period/1h'))

  it('should display cell (1, 1) correctly', () => {
    cy.get(SELECTOR1).should('be.visible').and('have.text', DIAGONAL_CELL)
  })

  it('should display cell (2, 2) correctly', () => {
    cy.get(SELECTOR2).should('be.visible').and('have.text', DIAGONAL_CELL)
  })
})

describe('Test "/custom-period" route', () => {
  beforeEach(() =>
    cy.visit('/custom-period?start_date=1622551197&end_date=1625056826')
  )

  it('should display cell (1, 1) correctly', () => {
    cy.get(SELECTOR1).should('be.visible').and('have.text', DIAGONAL_CELL)
  })

  it('should display cell (2, 2) correctly', () => {
    cy.get(SELECTOR2).should('be.visible').and('have.text', DIAGONAL_CELL)
  })

  it('should be inverse values cells (1, 3) and (3, 1)', () => {
    cy.get(SELECTOR_1_3)
      .invoke('text')
      .then((cell_1_3) => {
        cy.get(SELECTOR_3_1)
          .invoke('text')
          .should((cell_3_1) => {
            expect(
              Math.round(parseFloat(cell_1_3) * parseFloat(cell_3_1))
            ).to.eq(1)
          })
      })
  })
})
