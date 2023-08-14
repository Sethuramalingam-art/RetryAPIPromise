const cal = function () {
  this.total = 0;
  this.add = (val) => {
    this.total += val;
    return this;
  };
  this.sub = (val) => {
    this.total -= val;
    return this;
  };
  this.mul = (val) => {
    this.total *= val;
    return this;
  };
  this.divide = (val) => {
    this.total /= val;
    return this;
  };

  this.value = () => this.total;
};

const cala = new cal();
cala.add(10).sub(2).mul(2).divide(5);
console.log(cala.total);
