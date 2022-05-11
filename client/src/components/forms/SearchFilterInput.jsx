import TextField from '@material-ui/core/TextField';

const SearchFilterInput = ({ keyword, setKeyword, label = 'Filter' }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <div>
      <TextField
        type='search'
        label={label}
        value={keyword}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchFilterInput;
