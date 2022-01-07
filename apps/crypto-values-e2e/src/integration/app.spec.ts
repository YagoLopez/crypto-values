const DIAGONAL_CELL = '-'
const SELECTOR1 =
  '[tabindex="0"] > .ReactVirtualized__Grid__innerScrollContainer > [style="height: 50px; left: 0px; position: absolute; top: 0px; width: 75px; text-shadow: grey 2px 2px 4px;"]'
const SELECTOR2 =
  '[style="height: 50px; left: 75px; position: absolute; top: 50px; width: 75px; text-shadow: grey 2px 2px 4px;"]'

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
})
