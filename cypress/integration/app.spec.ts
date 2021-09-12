const APPLICATION_ADDRESS = "http://localhost:3000"

before(() => {
  cy.visit(APPLICATION_ADDRESS)
})

describe("integration videoplayer module", () => {
  it("should visit the app and toggle grayscale filter", () => {
    const requestPermissionButton = cy.dataCy("btn-request")

    requestPermissionButton.should("contain.text", "Turn on my camera")
    requestPermissionButton.click()

    cy.dataCy("btn-settings").click()

    cy.get("button")
      .last()
      .should("contain.text", "disabled")
      .click()
      .should("contain.text", "enabled")
  })

  it("should show and hide filter options on pause and unpause", () => {
    const btnPause = cy.dataCy("btn-pausetimer")
    btnPause.click().dataCy("btn-settings").should("not.exist")
    cy.dataCy("btn-pausetimer").click()
    cy.dataCy("btn-settings").should("exist")
  })

  it("should show correctly blur on change with controls", () => {
    const blurSelector = cy.dataCy("blur-selector")
    blurSelector.invoke("val", "50%").trigger("change")
    cy.dataCy("blur-widget-indicator").should("contain.text", "50%")
  })
})
