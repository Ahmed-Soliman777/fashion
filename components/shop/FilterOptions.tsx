"use client"

import { useState } from 'react'
import { RiArrowRightDoubleFill } from 'react-icons/ri'

const FilterOptions = () => {

    const [showFilter, setShowFilter] = useState(false)

    return (
        <aside className="w-full sm:min-w-60 sm:max-w-60">

            <button
                onClick={() => setShowFilter(prev => !prev)}
                className="mb-4 flex items-center gap-2 text-xl font-semibold sm:cursor-default">
                FILTERS
                <RiArrowRightDoubleFill
                    className={`transition-transform duration-300 sm:hidden ${showFilter ? "rotate-90" : ""}`}
                />
            </button>

            <div className={`space-y-6 sm:block ${showFilter ? "block" : "hidden"}`}>
                <div className="rounded-xl border border-border p-5">

                    <h3 className="mb-4 text-sm font-semibold tracking-wide">
                        CATEGORIES
                    </h3>

                    <div className="space-y-3 text-sm text-muted-foreground">
                        <label className="flex items-center gap-3">
                            <input type="checkbox" />
                            <span>Men</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" />
                            <span>Women</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" />
                            <span>Children</span>
                        </label>
                    </div>

                </div>

                <div className="rounded-xl border border-border p-5">
                    <h3 className="mb-4 text-sm font-semibold tracking-wide">
                        TYPE
                    </h3>

                    <div className="space-y-3 text-sm text-muted-foreground">
                        <label className="flex items-center gap-3">
                            <input type="checkbox" />
                            <span>Trousers</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" />
                            <span>Shirts</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" />
                            <span>Hoodies</span>
                        </label>
                    </div>

                </div>
            </div>

        </aside>
    )
}

export default FilterOptions