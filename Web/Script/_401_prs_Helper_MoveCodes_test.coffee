MoveCodes = window.prs.MoveCodes

describe "MoveCodes", ->
  it "papwer returns p", ->
  	expect(MoveCodes.paper).toBe("p")