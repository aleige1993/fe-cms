
import store from '../store';

class Tools {

  /*****
   * 根据枚举值获取数据
   *
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

}

export default new Tools();
