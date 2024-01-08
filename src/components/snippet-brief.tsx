import { Menu, Item, useContextMenu, TriggerEvent } from "react-contexify";
import "react-contexify/ReactContexify.css";
import {
  AiFillStar,
  AiFillDelete,
  AiFillCopy,
  AiOutlineUndo,
} from "react-icons/ai";

type SnippetBriefType = {
  snippetId: number;
  name: string;
  folder: string;
  date: string;
  highlighted: boolean;
  favorite: boolean;
  deleted: boolean;
  onCompRefresh: () => void;
  onShowAlert: (snippetId: number) => void;
};

const MENU_ID_FAV = "snippet-brief-context-menu-fav";
const MENU_ID_UNFAV = "snippet-brief-context-menu-unfav";
const MENU_ID_TRASHED = "snippet-brief-context-menu-trashed";

const MENU_TYPE_FAV = "favorite";
const MENU_TYPE_DUPLICATE = "duplicate";
const MENU_TYPE_TRASH = "trash";
const MENU_TYPE_DELETE = "delete";
const MENU_TYPE_RESTORE = "restore";

const { show } = useContextMenu();

const changeFavorite = (snippetId: number, favorite: boolean) => {
  const body = { type: "favorite", favorite: favorite };
  fetch("/api/snippets/" + snippetId, {
    method: "PATCH",
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((resBody) => {
      console.log("favorite has changed: " + favorite);
    });
};

const duplicate = (snippetId: number) => {
  console.log("duplicate: ", snippetId);
  const body = { type: "duplicate" };
  fetch("/api/snippets/" + snippetId, {
    method: "PATCH",
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((resBody) => {
      console.log("duplicate a snippet: " + resBody);
    });
};

const moveToTrash = (snippetId: number) => {
  const body = { type: "delete" };
  fetch("/api/snippets/" + snippetId, {
    method: "PATCH",
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((resBody) => {
      console.log("move to trash: " + resBody);
    });
};

const restoreFromTrash = (snippetId: number) => {
  const body = { type: "restore" };
  fetch("/api/snippets/" + snippetId, {
    method: "PATCH",
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((resBody) => {
      console.log("restore from trash: " + resBody);
    });
};

const SnippetBrief = (props: SnippetBriefType) => {
  const handleContextMenu = (
    event: TriggerEvent,
    deleted: boolean,
    favorite: boolean,
    id: number,
  ) => {
    if (deleted === true) {
      show({ id: MENU_ID_TRASHED, event: event, props: { id: id } });
      return;
    }
    if (favorite) {
      show({
        id: MENU_ID_FAV,
        event: event,
        props: { id: id, fav: !favorite },
      });
    } else {
      show({
        id: MENU_ID_UNFAV,
        event: event,
        props: { id: id, fav: !favorite },
      });
    }
  };

  const handleItemClick = async (e: any) => {
    const type = e.id;
    const snippetId = e.props.id;
    switch (type) {
      case MENU_TYPE_FAV:
        const favorite = e.props.fav;
        changeFavorite(snippetId, favorite);
        break;
      case MENU_TYPE_DUPLICATE:
        duplicate(snippetId);
        break;
      case MENU_TYPE_TRASH:
        moveToTrash(snippetId);
        break;
      case MENU_TYPE_RESTORE:
        restoreFromTrash(snippetId);
        break;
      case MENU_TYPE_DELETE:
        props.onShowAlert(snippetId);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <div
        onContextMenu={(e) =>
          handleContextMenu(e, props.deleted, props.favorite, props.snippetId)
        }
        className={`cursor-pointer snippet-brief-item pt-2 px-3 border-b-gray-300 border-b-2 h-20 flex flex-col justify-between ${
          props.highlighted ? "snippet-brief-hl" : "snippet-brief-nohl"
        }`}
      >
        <div className="text-md font-semibold inline-flex items-start">
          {props.name}
        </div>
        <div className="text-sm pb-1 inline-flex items-end justify-between subtitle">
          <div>{props.folder}</div>
          <div>{props.date}</div>
        </div>
      </div>
      <Menu id={MENU_ID_FAV} className="context-menu">
        <Item
          id="favorite"
          onClick={(e) => {
            handleItemClick(e).then(() => props.onCompRefresh());
          }}
        >
          <AiFillStar className="inline-block mr-2" />
          Remove from favorites
        </Item>
        <Item
          id="duplicate"
          onClick={(e) => {
            handleItemClick(e).then(() => props.onCompRefresh());
          }}
        >
          <AiFillCopy className="inline-block mr-2" /> Duplicate
        </Item>
        <Item
          id="trash"
          onClick={(e) => {
            handleItemClick(e).then(() => props.onCompRefresh());
          }}
        >
          <AiFillDelete className="inline-block mr-2" /> Move to trash
        </Item>
      </Menu>
      <Menu id={MENU_ID_UNFAV} className="context-menu">
        <Item
          id="favorite"
          onClick={(e) => {
            handleItemClick(e).then(() => props.onCompRefresh());
          }}
        >
          <AiFillStar className="inline-block mr-2" />
          Add to favorites
        </Item>
        <Item
          id="duplicate"
          onClick={(e) => {
            handleItemClick(e).then(() => props.onCompRefresh());
          }}
        >
          <AiFillCopy className="inline-block mr-2" /> Duplicate
        </Item>
        <Item
          id="trash"
          onClick={(e) => {
            handleItemClick(e).then(() => props.onCompRefresh());
          }}
        >
          <AiFillDelete className="inline-block mr-2" /> Move to trash
        </Item>
      </Menu>
      <Menu id={MENU_ID_TRASHED} className="context-menu">
        <Item
          id="restore"
          onClick={(e) => {
            handleItemClick(e).then(() => props.onCompRefresh());
          }}
        >
          <AiOutlineUndo className="inline-block mr-2" />
          Restore from trash
        </Item>
        <Item
          id="delete"
          onClick={(e) => {
            handleItemClick(e).then(() => props.onCompRefresh());
          }}
        >
          <AiFillDelete className="inline-block mr-2" />
          Completely delete
        </Item>
      </Menu>
    </div>
  );
};

export default SnippetBrief;
