import { Image } from '@mantine/core';

import TengoLogoWithTextDark from '../../../assets/UI/logo/logo_with_text_dark.svg';
import TengoLogoWithTextWhite from '../../../assets/UI/logo/logo_with_text_white.svg';

type LogoWithTextProps = {
  colorScheme?: 'light' | 'dark';
};

export function LogoWithText({ colorScheme = 'light' }: LogoWithTextProps) {
  const logo =
    colorScheme === 'light' ? TengoLogoWithTextDark : TengoLogoWithTextWhite;
  return <Image src={logo} alt={`Tengo logo ${colorScheme}`} w={98} miw={98} />;
}
