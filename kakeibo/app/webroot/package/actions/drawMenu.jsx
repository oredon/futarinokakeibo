import { TOGGLE_MENU } from '../constants/ActionTypes';

/**
 * サイドバーの開閉アクション
 */
export function toggleMenu(isOpen){
  return {
    type: TOGGLE_MENU,
    isOpen: !isOpen
  }
}
