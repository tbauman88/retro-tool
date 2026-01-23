import { AddIcon } from '@chakra-ui/icons';
import styled from 'styled-components';
import { useBoardState } from '../../contexts/BoardProvider';
import { useDialogs } from '../../dialog-manager';
import { useAddColumn } from '../../hooks/columns';
import { useActiveUsers } from '../../hooks/users';
import { Avatar, AvatarGroup } from '../Avatar';
import { useColorPreferences } from '../../hooks/useDarkMode';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { Button } from '../Button';
import { Tooltip } from '../Tooltip';
import { Timer } from '../Timer';
import { useActionItems } from '../../hooks/action-items';
import { useCopyToClipboard, useLocation } from "react-use";
import ActionMenu from "../ActionMenu";
import { useUpdateBoard } from "../../hooks/boards";

const AddColumnButton = styled.button`
  padding: 10px 20px;
`;

const AvatarContainer = styled.div`
  margin-left: auto;
`;

export function Navigation() {
  const { board, isBoardOwner } = useBoardState();
  const { mutateAsync: addColumnAsync } = useAddColumn(board?.id || '');
  const activeUsers = useActiveUsers(board?.id || '');
  const { data: actionItems } = useActionItems(board?.id);
  const { updateBoard } = useUpdateBoard(board?.id)
  const { openDialog } = useDialogs();
  const { theme, toggleTheme } = useColorPreferences();
  const [, copy] = useCopyToClipboard();
  const location = useLocation()

  if (!board) return null;

  const inviteCode = `${location.origin}/invites/${board.inviteCode}`;

  const DarkModeIcon = theme === 'dark' ? SunIcon : MoonIcon;

  const addColumn = async () => {
    openDialog('addColumn', {
      onSuccess: async (title) => {
        await addColumnAsync({ title });
      },
    });
  };

  return (
    <div className="flex items-center flex-shrink px-4">
      <div className="flex-1 flex items-center gap-4">
        <p className="text-2xl font-bold">{board.title}</p>
        <div className="inline-flex items-center text-xs gap-2 rounded bg-gray-200 border border-gray-300">
          <button className="p-1 border-l border-gray-300" onClick={() => copy(inviteCode)}>Copy Invite Code</button>
        </div>
      </div>
      <AvatarContainer>
        <AvatarGroup max={5}>
          {activeUsers?.map((user) => (
            <Tooltip label={user.githubNickname} key={user.id}>
              <Avatar size="xs" src={user.avatar} />
            </Tooltip>
          ))}
        </AvatarGroup>
      </AvatarContainer>
      <div className="ml-2">
        <Timer />
      </div>
      <Button size="sm" variant="white" className="ml-2" onClick={toggleTheme}>
        <DarkModeIcon className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="white"
        className="ml-2"
        onClick={() => openDialog('actionitems', { boardId: board.id })}
      >
        Action Items {actionItems?.length ? `(${actionItems.length})` : ''}
      </Button>
      <ActionMenu items={[
        {
          title: 'Sort by Most Recent',
          active: (board.settings as Record<string, string | undefined>)?.sortBy === 'createdAt',
          action: () => { updateBoard({ settings: { sortBy: 'createdAt' }})},
        },
        {
          title: 'Sort by Votes',
          active: (board.settings as Record<string, string | undefined>)?.sortBy === 'votes',
          action: () => { updateBoard({ settings: { sortBy: 'votes' }})},
        }
      ]}>
          <Button
            size="sm"
            variant="white"
            className="ml-2 flex items-center gap-2"
          >
            <p>Sort By</p>
          </Button>
      </ActionMenu>
      {isBoardOwner && (
        <Button size="sm" variant="white" className="ml-2" onClick={() => openDialog('boardExport', { board })}>
            Export
          </Button>
      )}
      <AddColumnButton onClick={addColumn} data-testid="add_column_button">
        <AddIcon />
      </AddColumnButton>
    </div>
  );
}
