import { ReactNode } from 'react';
// @mui
import { Box, Typography, Link } from '@mui/material';
//
import Breadcrumbs, { Props as BreadcrumbsProps } from './Breadcrumbs';

// ----------------------------------------------------------------------

interface Props extends BreadcrumbsProps {
  action?: ReactNode;
  heading: string;
  moreLink?: string | string[];
  icon?: ReactNode;
}

export default function HeaderBreadcrumbs({
  links,
  action,
  heading,
  icon,
  moreLink = '' || [],
  sx,
  ...other
}: Props) {
  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <span>{heading}</span>
              {icon && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '1rem',
                  }}
                >
                  {icon}
                </Box>
              )}
            </Box>
          </Typography>

          <Breadcrumbs links={links} {...other} />
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>

      <Box sx={{ mt: 2 }}>
        {typeof moreLink === 'string' ? (
          <Link href={moreLink} target="_blank" rel="noopener" variant="body2">
            {moreLink}
          </Link>
        ) : (
          moreLink.map((href) => (
            <Link
              noWrap
              key={href}
              href={href}
              variant="body2"
              target="_blank"
              rel="noopener"
              sx={{ display: 'table' }}
            >
              {href}
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
}
