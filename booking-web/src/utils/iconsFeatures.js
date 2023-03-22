import feature_1 from '../assets/icons/features/feature_1.svg'
import feature_2 from '../assets/icons/features/feature_2.svg'
import feature_3 from '../assets/icons/features/feature_3.svg'
import feature_4 from '../assets/icons/features/feature_4.svg'
import feature_5 from '../assets/icons/features/feature_5.svg'
import feature_6 from '../assets/icons/features/feature_6.svg'
import feature_7 from '../assets/icons/features/feature_7.svg'
import feature_8 from '../assets/icons/features/feature_8.svg'

export const getIcon = (feature) => {
  switch (feature) {
    case 1:
      return feature_1
    case 2:
      return feature_2
    case 3:
      return feature_3
    case 4:
      return feature_4
    case 5:
      return feature_5
    case 6:
      return feature_6
    case 7:
      return feature_7
    case 8:
      return feature_8
    default:
      break;
  }
}