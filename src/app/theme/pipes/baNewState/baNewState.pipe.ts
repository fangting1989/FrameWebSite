import { Pipe, PipeTransform } from '@angular/core';
import { layoutPaths } from '../../../theme';

@Pipe({ name: 'baNewState' })
export class BaNewStatePipe implements PipeTransform {
  transform(value, args) {
    var ret = ''
    switch (value) {
      case -1: ret = '已取消'; break;
      case 0: ret = '已保存'; break;
      case 1: ret = '已发布'; break;
      case '05': ret = '商服用地'; break;
      case '051': ret = '批发零售用地'; break;
      case '052': ret = '住宿餐饮用地'; break;
      case '053': ret = '商务金融用地'; break;
      case '054': ret = '其他商服用地'; break;
      case '06': ret = '工矿仓储用地'; break;
      case '061': ret = '工业用地'; break;
      case '062': ret = '采矿用地'; break;
      case '063': ret = '仓储用地'; break;
      case '07': ret = '住宅用地'; break;
      case '071': ret = '高档住宅用地'; break;
      case '072': ret = '中低价位、中小套型普通商品住房用地'; break;
      case '073': ret = '其他普通商品住房用地'; break;
      case '074': ret = '经济适用住房用地'; break;
      case '075': ret = '廉租住房用地'; break;
      case '076': ret = '其他住房用地'; break;
      case '08': ret = '公共管理与公共服务用地'; break;
      case '081': ret = '机关团体用地'; break;
      case '082': ret = '新闻出版用地'; break;
      case '083': ret = '科教用地'; break;
      case '084': ret = '医卫慈善用地'; break;
      case '085': ret = '文体娱乐用地'; break;
      case '086': ret = '公共设施用地'; break;
      case '087': ret = '公园与绿地'; break;
      case '088': ret = '风景名胜设施用地'; break;
      case '09': ret = '特殊用地'; break;
      case '091': ret = '军事设施用地'; break;
      case '092': ret = '使领馆用地'; break;
      case '093': ret = '监教场所用地'; break;
      case '094': ret = '宗教用地'; break;
      case '095': ret = '殡葬用地'; break;
      case '10': ret = '交通运输用地'; break;
      case '101': ret = '铁路用地'; break;
      case '102': ret = '公路用地'; break;
      case '103': ret = '街巷用地'; break;
      case '104': ret = '农村道路'; break;
      case '105': ret = '机场用地'; break;
      case '106': ret = '港口码头用地'; break;
      case '107': ret = '管道运输用地'; break;
      case '11': ret = '水域及水利设施用地'; break;
      case '111': ret = '河流水面'; break;
      case '112': ret = '湖泊水面'; break;
      case '113': ret = '水库水面'; break;
      case '114': ret = '坑塘水面'; break;
      case '115': ret = '沿海滩涂'; break;
      case '116': ret = '内陆滩涂'; break;
      case '117': ret = '沟渠'; break;
      case '118': ret = '水工建筑用地'; break;
      case '119': ret = '冰川及永久积雪'; break;
      case '12': ret = '其他土地'; break;
      case '121': ret = '空闲地'; break;
      case '122': ret = '设施农用地'; break;
      case '123': ret = '田坎'; break;
      case '124': ret = '盐碱地'; break;
      case '125': ret = '沼泽地'; break;
      case '126': ret = '沙地'; break;
      case '127': ret = '裸地'; break;
      case '1': ret = '划拨'; break;
      case '2': ret = '招拍挂出让'; break;
      case '3': ret = '协议出让'; break;
      case '4': ret = '租赁'; break;
      case '5': ret = '作价出资或入股'; break;
      case '6': ret = '授权经营'; break;
      case '3': ret = '协议出让'; break;
      case '21': ret = '招标出让'; break;
      case '22': ret = '拍卖出让'; break;
      case '23': ret = '挂牌出让'; break;
      case 'dj1': ret = '一级'; break;
      case 'dj2': ret = '二级'; break;
      case 'dj3': ret = '三级'; break;
      case 'dj4': ret = '四级'; break;
      case 'dj5': ret = '五级'; break;
      case 'dj6': ret = '六级'; break;
      case 'dj7': ret = '七级'; break;
      case 'dj8': ret = '八级'; break;
      case 'dj9': ret = '九级'; break;
      case 'dj10': ret = '十级'; break;
      case 'dj11': ret = '十一级'; break;
      case 'dj12': ret = '十二级'; break;
      case 'dj13': ret = '十三级'; break;
      case 'dj14': ret = '十四级'; break;
      case 'dj15': ret = '十五级'; break;
      case 'dj16': ret = '十六级'; break;
      case 'dj17': ret = '十七级'; break;
      case 'dj18': ret = '十八级'; break;
      case 'dj0': ret = '未评估地区'; break;
      default: ret = '未知';
    }
    return ret;
  }
}



