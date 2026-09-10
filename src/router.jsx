import React from 'react';
export function Link({ to, children, ...props }) {
  const href = to === '/' ? import.meta.env.BASE_URL : to.startsWith('/') ? `https://funnelstudio.ai${to}` : to;
  return <a href={href} {...props}>{children}</a>;
}
