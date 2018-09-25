
import store from '../store';

class Tools {

  /*****
   * 根据枚举值获取数据
   */
  getEnumData(enumName) {
    let enumArr = [];
    store.getters.enumList.map(item => {
      if (item.EnumName === enumName) {
        enumArr = item.items;
      }
    });
    return enumArr;
  }

  /*****
   * 根据枚举值key获取value
   */
  getEnumTextByValue(enumName, value) {
    let enumText = '';
    this.getEnumData(enumName).map(item => {
        if (item.value === value) {
          enumText = item.text;
        }
    });
    return enumText;
  }

}

export default new Tools();
