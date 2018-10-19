
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
    let enumArray = enumName;
    if (typeof enumName === 'string') {
      enumArray = this.getEnumData(enumName);
    }
    enumArray.map(item => {
        if (item.value === value) {
          enumText = item.text;
        }
    });
    return enumText;
  }

  /*****
   * 表格最大高度
   */
  getTableHeight() {
    return document.documentElement.clientHeight - 240;
  }

}

export default new Tools();
