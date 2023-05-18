export { }; // this file needs to be a module
declare global {

    interface String {
        isNullOrEmpty(this: string): boolean;
    }
    
    interface String {
        finacialToNumber(this: string): any;
    }

    interface String {
        percentageToNumber(this: string): any;
    }
    
    interface String {
        stringToFinacial(this: string): any;
    }
    
    interface String {
        stringToNumber(this: string): any;
    }
    
    interface String {
        stringToDate(this: string): any;
    }
    
}

