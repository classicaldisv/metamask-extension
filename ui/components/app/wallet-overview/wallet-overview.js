import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { toChecksumHexAddress } from '../../../../shared/modules/hexstring-utils';
import { getSelectedInternalAccount } from '../../../selectors';
import { AddressCopyButton } from '../../multichain';
import Box from '../../ui/box/box';
import { IconName, Tag } from '../../component-library';
import { Color, TextVariant } from '../../../helpers/constants/design-system';
import { KeyringType } from '../../../../shared/constants/keyring';
import { getAccountLabel } from '../../../helpers/utils/accounts';

const WalletOverview = ({
  balance,
  buttons,
  className,
  showAddress = false,
}) => {
  const selectedAccount = useSelector(getSelectedInternalAccount);
  const checksummedAddress = toChecksumHexAddress(selectedAccount.address);
  const { keyring } = selectedAccount.metadata;
  const label = selectedAccount.metadata.snap?.name
    ? getAccountLabel(keyring.type, selectedAccount)
    : null;
  return (
    <div className={classnames('wallet-overview', className)}>
      <div className="wallet-overview__balance">
        {showAddress ? (
          <Box marginTop={2}>
            <AddressCopyButton address={checksummedAddress} shorten />
          </Box>
        ) : null}
        {balance}
        {label ? (
          <Tag
            label={label}
            labelProps={{
              variant: TextVariant.bodyXs,
              color: Color.textAlternative,
            }}
            startIconName={
              keyring.type === KeyringType.snap ? IconName.Snaps : null
            }
          />
        ) : null}
      </div>
      <div className="wallet-overview__buttons">{buttons}</div>
    </div>
  );
};

WalletOverview.propTypes = {
  balance: PropTypes.element.isRequired,
  buttons: PropTypes.element.isRequired,
  className: PropTypes.string,
  showAddress: PropTypes.bool,
};

export default WalletOverview;
