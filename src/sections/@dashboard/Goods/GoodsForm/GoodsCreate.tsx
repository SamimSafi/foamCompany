import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import useLocales from 'src/hooks/useLocales';
// _mock_
import { _userList } from '../../../../_mock';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import GoodsNewEditForm from './GoodsNewEditForm';
import React from 'react';
// sections

// @type

// ----------------------------------------------------------------------

export default function GoodsCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  return (
    <Page title={!isEdit ? `${translate('Goods.AddTitle')}` : `${translate('Goods.UpdateTitle')}`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit ? `${translate('Goods.CreateGoods')}` : `${translate('Goods.EditGoods')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('Goods.GoodsList')}`,
              href: PATH_DASHBOARD.ContractDetails.list,
            },
            {
              name: !isEdit ? `${translate('Goods.New')}` : `${translate('Goods.Update')}`,
            },
          ]}
        />
        <GoodsNewEditForm />
      </Container>
    </Page>
  );
}
