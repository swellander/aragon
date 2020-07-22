import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Header,
  IconEdit,
  IconTrash,
  noop,
  Split,
  useLayout,
} from '@aragon/ui'
import { STATUS_ACTIVE, STATUS_PENDING } from './agreement-statuses'
import AgreementDetails from './AgreementDetails'
import AgreementDocument from './AgreementDocument'
import AgreementHeader from './AgreementHeader'
import ConfigurationChecklist from './ConfigurationChecklist'
import { dateFormat } from '../../date-utils'
import DisputableApps from './DisputableApps/DisputableApps'
import DisputableAppsEmpty from './DisputableApps/DisputableAppsEmpty'
import VersionHistory from './VersionHistory'
import VotePending from './VotePending'

import AGREEMENTS_MOCK_DATA from './mock-data'

function Agreement({ agreements }) {
  const [checklistCompleted, setChecklistCompleted] = useState(true)
  const { layoutName } = useLayout()

  // Temporarily provide mock data if initially undefined
  const agreement = (agreements && agreements[0]) || AGREEMENTS_MOCK_DATA[0]
  const { appAddress, stakingPool, versions } = agreement
  const { title } = agreement.currentVersion

  const agreementStatus = STATUS_ACTIVE
  const compactMode = layoutName === 'small'

  const handleChecklistClose = useCallback(() => {
    setChecklistCompleted(true)
  }, [])

  // TODO: Replace with real data
  const mockEndDate = useMemo(() => {
    const NOW = Date.now()
    const DAY = 1000 * 60 * 60 * 24

    return new Date(NOW + 5 * DAY)
  }, [])

  // TODO: Replace with real data
  const mockChecklistItems = useMemo(
    () => [
      ['Create Agreement', true],
      ['Set permissions', true],
      ['Set actions requirements', true],
      ['Share with members', true],
    ],
    []
  )

  const historyItems = useMemo(
    () =>
      versions.map(({ effectiveFrom }) =>
        dateFormat(effectiveFrom, 'onlyDate')
      ),
    [versions]
  )

  // TODO: Replace with real data
  const mockAppItem = useMemo(() => {
    return {
      entryActions: [
        [
          () => {
            console.log('Update disputable app')
          },
          <IconEdit />,
          'Update',
        ],
        [
          () => {
            console.log('Remove disputable app')
          },
          <IconTrash />,
          'Remove',
        ],
      ],
      allowedActions: ['Action one', 'Action two', 'Action three'],
      actionCollateral: {
        amount: 100,
        symbol: 'ANT',
        address: '0x960b236A07cf122663c4303350609A66A7B288C0',
      },
      challengeCollateral: {
        amount: 100,
        symbol: 'ANT',
        address: '0x960b236A07cf122663c4303350609A66A7B288C0',
      },
      signerEligibility: {
        amount: 5,
        symbol: 'ANT',
        address: '0x960b236A07cf122663c4303350609A66A7B288C0',
      },
      challengeEligibility: 'Open to everyone',
      challengePeriod: 48,
      settlementPeriod: 24,
    }
  }, [])

  const mockAppItems = useMemo(() => [mockAppItem, mockAppItem, mockAppItem], [
    mockAppItem,
  ])

  return (
    <React.Fragment>
      <Header
        primary="Agreement"
        secondary={
          <Button
            disabled
            mode="strong"
            label="Update Agreement"
            onClick={noop}
            icon={<IconEdit />}
            display={compactMode ? 'icon' : 'label'}
          />
        }
      />

      <Split
        primary={
          <React.Fragment>
            <Box>
              <AgreementHeader
                title={title}
                status={agreementStatus}
                onSign={() => {
                  console.log('Signed')
                }}
                onShare={() => {
                  console.log('Shared')
                }}
              />
              <AgreementDetails
                ipfsLink="QmXpcBiGZ7Uep2tmhxLhfA8ak1aYDUyevFSnpUa4Gc9kRn"
                stakingAddress={stakingPool}
                contractAddress={appAddress}
              />
            </Box>
            {mockAppItems.length > 0 ? (
              <DisputableApps items={mockAppItems} />
            ) : (
              <DisputableAppsEmpty />
            )}
            <AgreementDocument title="DAO Agreement" />
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            {!checklistCompleted && (
              <ConfigurationChecklist
                items={mockChecklistItems}
                onClose={handleChecklistClose}
              />
            )}

            <Box heading="Version history" padding={0}>
              {agreementStatus === STATUS_PENDING && (
                <VotePending endDate={mockEndDate} />
              )}
              {agreementStatus === STATUS_ACTIVE && (
                <VersionHistory items={historyItems} />
              )}
            </Box>
          </React.Fragment>
        }
      />
    </React.Fragment>
  )
}

Agreement.propTypes = {
  agreements: PropTypes.array,
}

export default React.memo(Agreement)
