import classNames from 'classnames';
import { DotsLoading, Dropdown, FilterOption, FilterSection, FiltersSection, RefFiltersSection } from 'clo-ui';
import { isEmpty, isUndefined } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';

import { Filter } from '../../types';
import styles from './FiltersInLine.module.css';

interface Props {
  filters: FilterSection[];
  activeFilters: {
    [key: string]: string[];
  };
  projects?: Filter;
  mentorAvailable: boolean;
  onChange: (name: string, value: string, checked: boolean, type?: string) => void;
  onResetFilters: () => void;
  isLoadingFilters?: boolean;
  device: string;
}

interface FiltersProps {
  activeFilters: string[];
  contentClassName?: string;
  section: FilterSection;
  device: string;
  withSearchBar?: boolean;
  onChange: (name: string, value: string, checked: boolean, type?: string) => void;
  closeDropdown?: () => void;
  isVisibleDropdown?: boolean;
}

const Filters = (props: FiltersProps) => {
  const filtersSection = useRef<RefFiltersSection>(null);

  const onChangeFilter = (name: string, value: string, checked: boolean, type?: string) => {
    props.onChange(name, value, checked, type);
    if (!isUndefined(props.closeDropdown)) {
      props.closeDropdown();
    }
  };

  useEffect(() => {
    if (!isUndefined(props.isVisibleDropdown) && !props.isVisibleDropdown && filtersSection && filtersSection.current) {
      filtersSection.current.cleanValue();
    }
  }, [props.isVisibleDropdown]);

  return (
    <div className="ms-3 mt-2">
      <FiltersSection
        ref={filtersSection}
        device={props.device}
        activeFilters={props.activeFilters}
        contentClassName={`overflow-auto ${styles.projectOptions}`}
        section={props.section}
        withSearchBar={props.withSearchBar}
        onChange={onChangeFilter}
        visibleTitle={false}
      />
    </div>
  );
};

const FiltersInLine = (props: Props) => {
  const getActiveFiltersForOther = (): string[] => {
    return props.mentorAvailable ? ['mentor_available'] : [];
  };

  return (
    <div className="d-none d-lg-block mb-2">
      <div className="d-flex flex-row align-items-baseline mt-2 mb-3">
        <div className={`text-uppercase text-secondary fw-bold ${styles.title}`}>Filters</div>
        {(!isEmpty(props.activeFilters) || props.mentorAvailable) && (
          <button
            className={`btn btn-link text-secondary btn-sm py-0 me-3 ${styles.btnRemove}`}
            onClick={props.onResetFilters}
            aria-label="Remove all filters"
          >
            <div className="d-flex flex-row align-items-center">
              <div className="me-1">Clear all</div>
              <IoMdCloseCircleOutline />
            </div>
          </button>
        )}
      </div>
      {props.isLoadingFilters ? (
        <DotsLoading className="my-auto" />
      ) : (
        <div className="d-flex flex-row align-items-top">
          {props.filters.map((section: FilterSection, index: number) => {
            const isProjectSection = section.key && section.key === 'project';
            const activeFilters = section.key ? props.activeFilters[section.key] : getActiveFiltersForOther();

            return (
              <React.Fragment key={`sec_${section.key}`}>
                <div
                  className={classNames(styles.dropdownWrapper, {
                    'me-2 me-lg-3 me-xl-4': index !== props.filters.length - 1,
                  })}
                >
                  <Dropdown
                    label="Filters"
                    btnContent={section.title}
                    btnClassName={`btn btn-md btn-light text-decoration-none text-start w-100 ${styles.btn}`}
                    dropdownClassName={classNames(styles.dropdown, { [styles.projectDropdown]: isProjectSection })}
                  >
                    <Filters
                      section={section}
                      device={props.device}
                      activeFilters={activeFilters}
                      withSearchBar={isProjectSection ? true : undefined}
                      onChange={props.onChange}
                    />
                  </Dropdown>
                  {activeFilters && (
                    <div className="mt-2">
                      {activeFilters.map((filter: string) => {
                        const selectedFilter = section.options.find(
                          (f: FilterOption) => f.key === filter || f.value === filter
                        );

                        if (isUndefined(selectedFilter)) return null;

                        return (
                          <button
                            className={`btn btn-sm btn-link text-start w-100 text-decoration-none ${styles.btnActiveFilter}`}
                            onClick={() =>
                              props.onChange(
                                (selectedFilter.key || section.key)!,
                                filter as string,
                                false,
                                selectedFilter.type
                              )
                            }
                            key={`fil_${selectedFilter.value}`}
                          >
                            <div className="d-flex flex-row align-items-center">
                              <div className="flex-grow-1 text-truncate me-2">{selectedFilter.name}</div>
                              <IoMdCloseCircleOutline className={`ms-auto ${styles.closeBtn}`} />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FiltersInLine;
