import { useEffect, useState, useCallback } from 'react';
import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
// @mui
import { Box, Card, Divider, Container, Typography, Pagination } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useLocales from 'src/hooks/useLocales';
// utils
import axios from '../../utils/axios';
// @types
import Page from '../../components/Page';
import Markdown from '../../components/Markdown';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { SkeletonPost } from '../../components/skeleton';
export default function BlogPost() {
  const { themeStretch } = useSettings();
 const {translate} = useLocales();
  const isMountedRef = useIsMountedRef();

  const { title } = useParams();

  const [recentPosts, setRecentPosts] = useState([]);


  const [error, setError] = useState(null);


  const getRecentPosts = useCallback(async () => {
    try {
      const response = await axios.get('/api/blog/posts/recent', {
        params: { title },
      });

      if (isMountedRef.current) {
        setRecentPosts(response.data.recentPosts);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef, title]);

  useEffect(() => {
  
    getRecentPosts();
  }, [getRecentPosts]);

  return (
    <Page title="Blog: Post Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Post Details"
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: sentenceCase(title as string) },
          ]}
        />

    
      
        {error && <Typography variant="h6">404 {error}!</Typography>}

        {/* <BlogPostRecent posts={recentPosts} /> */}
      </Container>
    </Page>
  );
}
