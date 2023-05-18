export {}; // this file needs to be a module
String.prototype.isNullOrEmpty = function (this: string): boolean {
  return !this;
};

String.prototype.finacialToNumber = function (this: string): any {
  if (this.isNullOrEmpty()) {
    return null;
  }
  return this ? parseFloat(Number(this.replaceAll(',', '')).toFixed(2)) : null;
};

String.prototype.percentageToNumber = function (this: string): any {
  if (this.replaceAll('%', '').isNullOrEmpty()) {
    return null;
  }
  return this ? parseFloat(Number(this.replaceAll('%', '')).toFixed(2)) : null;
};

String.prototype.stringToFinacial = function (this: string): any {
  if (this.isNullOrEmpty()) {
    return null;
  }
  return Number(this)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

String.prototype.stringToNumber = function (this: string): any {
  if (this.isNullOrEmpty()) {
    return null;
  }
  return Number(this);
};

String.prototype.stringToDate = function (this: any): any {
    if (!this) {
        return null
    }
    return new Date(this.toString());
};
 
