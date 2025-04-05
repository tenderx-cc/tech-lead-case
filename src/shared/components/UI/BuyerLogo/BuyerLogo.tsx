import { useEffect, useState } from 'react';

import type { AvatarProps } from '@mantine/core';

import BackupImg from '../../../assets/UI/classical-building.png';

import { Avatar } from '../Avatar/Avatar';

type SizeParam = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type BuyerLogoProps = {
  logoURL?: string;
  buyerId?: number;
  size?: SizeParam;
  radius?: SizeParam;
} & AvatarProps;

export function BuyerLogo({
  logoURL: initialLogoUrl,
  size,
  radius,
  ...rest
}: BuyerLogoProps) {
  const [logoURL, setLogoURL] = useState<string | null>(initialLogoUrl || null);
  const { src: _src, variant: _variant, ...restWithoutSrc } = rest;


  useEffect(() => {
    setLogoURL(initialLogoUrl || null);
  }, [initialLogoUrl]);

  return (
    <Avatar
      size={size}
      radius={radius}
      src={logoURL || BackupImg}
      {...restWithoutSrc}
    />
  );
}
