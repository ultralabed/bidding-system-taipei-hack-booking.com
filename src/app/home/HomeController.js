import mappingData from '../../common/mockData/mapping.json!';

export default class HomeController {

  /*@ngInject*/
  constructor($state, $log, $cookieStore, ToastrService, moment) {
    let homeCtrl = this;
    homeCtrl.message = 'this is a home';
    this.toastrService = ToastrService;
    this.$cookieStore = $cookieStore;
    this.$state = $state;
    this.$log = $log;
    this.moment = moment;
    this.mappingData = mappingData;

    this.date = null;
    this.location = '';
    this.days = 1;
    this.budget = null;
    this.services = {
      3: false,
      22: false,
      242: false,
      124: false,
      5: false,
      6: false,
      12: false,
      13: false,
      20: false,
    };
    this.servicesSelected = [];
  }

  search() {
    let tmpDate = this.moment(this.date).unix();
    let data = {
      bid_owner: 'ibm',
      anonymous: true,
      p_allowed_overbudget: 2,
      location: this.location,
      length_stay: this.days,
      when: tmpDate * 1000,
      requirements: this.servicesSelected,
    };
    this.$log.log('HomeController data' + data);
    this.$state.go('cbid');
  }

  selectService(serviceKey) {
    let findService = (item) => item === serviceKey;
    let serviceIndex = this.servicesSelected.findIndex(findService);
    serviceIndex >= 0 ?
      this.servicesSelected.splice(serviceIndex, 1)
      :
      this.servicesSelected.push(serviceKey);
  }
}
