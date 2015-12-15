describe('in myapp index page, there ', function(){
    beforeEach(function(){
        browser.get('index.html');
    });
    it("should be a form on the page", function(){
		var form = element.all(by.name("regform"));
		expect(form.count()).toBe(1);
	}),
	it('should be test title', function(){
         expect(browser.getTitle()).toBe('My App');
	})
});
	