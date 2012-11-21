(function() {
  var MoveCodes;

  MoveCodes = window.prs.MoveCodes;

  describe("MoveCodes", function() {
    return it("papwer returns p", function() {
      return expect(MoveCodes.paper).toBe("p");
    });
  });

}).call(this);
