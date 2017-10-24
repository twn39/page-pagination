class Paginator {
    per_page:number;

    length:number;

    constructor(per_page:number = 25, length:number = 10) {
        this.per_page = per_page;
        this.length = length;
    }

    build(total_results, current_page) {
        // We want the number of pages, rounded up to the nearest page.
        let total_pages = Math.ceil(total_results / this.per_page);

        // Ensure both total_results and current_page are treated as Numbers
        total_results = parseInt(total_results, 10);
        current_page  = parseInt(current_page, 10) || 1;

        // Obviously we can't be on a negative or 0 page.
        if (current_page < 1) { current_page = 1; }
        // If the user has done something like /page/99999 we want to clamp that back
        // down.
        if (current_page > total_pages) { current_page = total_pages; }

        // This is the first page to be displayed as a numbered link.
        let first_page = Math.max(1, current_page - Math.floor(this.length / 2));

        // And here's the last page to be displayed specifically.
        let last_page = Math.min(total_pages, current_page + Math.floor(this.length / 2));

        // This is triggered if we're at or near one of the extremes; we won't have
        // enough page links. We need to adjust our bounds accordingly.
        if (last_page - first_page + 1 < this.length) {
            if (current_page < (total_pages / 2)) {
                last_page = Math.min(total_pages, last_page + (this.length - (last_page - first_page)));
            } else {
                first_page = Math.max(1, first_page - (this.length - (last_page - first_page)));
            }
        }

        // This can be triggered if the user wants an odd number of pages.
        if (last_page - first_page + 1 > this.length) {
            // We want to move towards whatever extreme we're closest to at the time.
            if (current_page > (total_pages / 2)) {
                first_page++;
            } else {
                last_page--;
            }
        }

        // First result on the page. This, along with the field below, can be used to
        // do "showing x to y of z results" style things.
        let first_result = this.per_page * (current_page - 1);
        if (first_result < 0) { first_result = 0; }

        // Last result on the page.
        let last_result = (this.per_page * current_page) - 1;
        if (last_result < 0) { last_result = 0; }
        if (last_result > Math.max(total_results - 1, 0)) { last_result = Math.max(total_results - 1, 0); }

        // GIMME THAT OBJECT
        return {
            total_pages: total_pages,
            pages: Math.min(last_page - first_page + 1, total_pages),
            current_page: current_page,
            first_page: first_page,
            last_page: last_page,
            previous_page: current_page - 1,
            next_page: current_page + 1,
            has_previous_page: current_page > 1,
            has_next_page: current_page < total_pages,
            total_results: total_results,
            results: Math.min(last_result - first_result + 1, total_results),
            first_result: first_result,
            last_result: last_result,
        };
    }
}

export default Paginator;