import angular from 'angular';

export class FooterComponent {
  constructor() {
    var currentDate = new Date();
    var currentYear = currentDate.getUTCFullYear();
    if (currentYear > 2016) {
      this.date = "2016 - " + currentYear.toString();
    } else {
      this.date = currentYear.toString();
    }
  }

}

export default angular.module('directives.footer', [])
  .component('footer', {
    template: require('./footer.html'),
    controller: FooterComponent
  })
  .name;