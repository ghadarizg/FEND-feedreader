/**here we are expeted that all the feeds are defined and came frm the app.js */
$(function () {
    describe('RSS Feeds', function () {
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });


        /**here we want to ensure that each url are defined and not empty 
         * we expect that each url feed are defined 
         */
        it('each has url defined', function () {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.constructor).toBe(String);
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* here we are ensure that each feed has a name is defined and the lengh is not zero
         */

        it('each has name', function () {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.constructor).toBe(String);
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* here we are going if the menu working when click 
    * first we will checking if the menu is hidden by a default
    * the function will check if the body has thee hidden class
    * *we expect to be true it's hidden by default 
    */
    describe('The menu', function () {

        it('hidden by default', function () {
            let chechHidden = document.body.classList.contains('menu-hidden');
            expect(chechHidden).toBe(true);
        });

   
    /* ensureing that the menu button work
     */
    it('change icons when clicked', function () {
        let iconClicked = document.querySelector('a.menu-icon-link');
        iconClicked.click();
        expect(document.body.classList.contains('menu-hidden')).toBe(false);
        iconClicked.click();
        expect(document.body.classList.contains("menu-hidden")).toBe(true);
    });
 });
    /* it's requried asynchronous so we will use the call back function */
    describe('initial entries', function () {

        beforeEach(function (done) {
            loadFeed(1, done);
        });

        it('entries feed container', function () {
            let container_feed = document.querySelector('div.feed');
            let entries = container_feed.querySelectorAll('article.entry')
            expect(entries.length).toBeGreaterThan(0);
        });
    });

    /**
     * decleared to varible f1,f2 without a value 
     * use the asynchronous support
     * calling the jasimine before each function 
     */
       
    describe('New Feed Selection', function () {
        let f1, f2;
        beforeEach(function (done) {
            loadFeed(3, function () {
                f1 = document.querySelector('div.feed').innerHTML;
                loadFeed(2, function () {
                    f2 = document.querySelector('div.feed').innerHTML;
                    done();
                });
            });
        });
        it('loading new feeds', function () {
            expect(f1).not.toBe(f2);
        });
    });
}());
